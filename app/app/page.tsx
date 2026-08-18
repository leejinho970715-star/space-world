import { requireChatGPTUser } from "../chatgpt-auth";
import AppJourney from "../components/AppJourney";
import { getJourneyProgress } from "../../db/progress";

export const dynamic="force-dynamic";

async function ExplorerApp(){
  const user=await requireChatGPTUser("/app");
  const progress=await getJourneyProgress(user);
  const firstName=user.displayName.includes("@")?"Explorer":user.displayName.split(" ")[0];
  return <AppJourney initialProgress={progress} explorerName={firstName}/>;
}

export default function Page(){return <ExplorerApp/>}
