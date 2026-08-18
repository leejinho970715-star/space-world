import { env } from "cloudflare:workers";
import type { ChatGPTUser } from "../app/chatgpt-auth";
import { JOURNEY_STAGES, type JourneyStageSlug } from "../app/lib/journey";

export type JourneyProgress={completed:JourneyStageSlug[];currentStage:JourneyStageSlug;createdAt:string;isComplete:boolean};

async function ensureJourneyTables(){
  const db=env.DB;
  if(!db)throw new Error("Cloudflare D1 binding `DB` is unavailable.");
  await db.batch([
    db.prepare(`CREATE TABLE IF NOT EXISTS explorer_profiles (
      user_id TEXT PRIMARY KEY NOT NULL,
      email TEXT NOT NULL,
      display_name TEXT NOT NULL,
      current_stage TEXT NOT NULL DEFAULT 'earth',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    db.prepare(`CREATE TABLE IF NOT EXISTS exploration_progress (
      user_id TEXT NOT NULL,
      stage_slug TEXT NOT NULL,
      completed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id, stage_slug)
    )`),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_exploration_progress_user_id ON exploration_progress(user_id)"),
  ]);
  return db;
}

async function upsertProfile(user:ChatGPTUser){
  const db=await ensureJourneyTables();
  await db.prepare(`INSERT INTO explorer_profiles (user_id,email,display_name)
    VALUES (?,?,?) ON CONFLICT(user_id) DO UPDATE SET email=excluded.email,display_name=excluded.display_name,updated_at=CURRENT_TIMESTAMP`)
    .bind(user.userId,user.email,user.displayName).run();
  return db;
}

export async function getJourneyProgress(user:ChatGPTUser):Promise<JourneyProgress>{
  const db=await upsertProfile(user);
  const profile=await db.prepare("SELECT current_stage,created_at FROM explorer_profiles WHERE user_id=?").bind(user.userId).first<{current_stage:string;created_at:string}>();
  const result=await db.prepare("SELECT stage_slug FROM exploration_progress WHERE user_id=? ORDER BY completed_at").bind(user.userId).all<{stage_slug:string}>();
  const completed=result.results.map(row=>row.stage_slug).filter((slug):slug is JourneyStageSlug=>JOURNEY_STAGES.some(stage=>stage.slug===slug));
  const fallback=JOURNEY_STAGES[Math.min(completed.length,JOURNEY_STAGES.length-1)].slug;
  const currentStage=JOURNEY_STAGES.some(stage=>stage.slug===profile?.current_stage)?profile!.current_stage as JourneyStageSlug:fallback;
  return {completed,currentStage,createdAt:profile?.created_at??new Date().toISOString(),isComplete:completed.length===JOURNEY_STAGES.length};
}

export async function completeJourneyStage(user:ChatGPTUser,stageSlug:JourneyStageSlug){
  const db=await upsertProfile(user);
  const index=JOURNEY_STAGES.findIndex(stage=>stage.slug===stageSlug);
  const nextStage=JOURNEY_STAGES[Math.min(index+1,JOURNEY_STAGES.length-1)].slug;
  await db.batch([
    db.prepare("INSERT INTO exploration_progress (user_id,stage_slug) VALUES (?,?) ON CONFLICT(user_id,stage_slug) DO NOTHING").bind(user.userId,stageSlug),
    db.prepare("UPDATE explorer_profiles SET current_stage=?,updated_at=CURRENT_TIMESTAMP WHERE user_id=?").bind(nextStage,user.userId),
  ]);
  return getJourneyProgress(user);
}
