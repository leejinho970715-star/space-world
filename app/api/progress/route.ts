import { getChatGPTUser } from "../../chatgpt-auth";
import { completeJourneyStage, getJourneyProgress } from "../../../db/progress";
import { isJourneyStage } from "../../lib/journey";

export async function GET(){
  const user=await getChatGPTUser();
  if(!user)return Response.json({error:"Authentication required"},{status:401});
  return Response.json(await getJourneyProgress(user));
}

export async function POST(request:Request){
  const user=await getChatGPTUser();
  if(!user)return Response.json({error:"Authentication required"},{status:401});
  const payload=await request.json() as {stage?:unknown};
  if(!isJourneyStage(payload.stage))return Response.json({error:"Unknown journey stage"},{status:400});
  return Response.json(await completeJourneyStage(user,payload.stage));
}
