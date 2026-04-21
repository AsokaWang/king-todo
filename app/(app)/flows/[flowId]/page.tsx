import { FlowWorkspace } from "@/components/task/flow-workspace"

type FlowPageProps = {
  params: Promise<{ flowId: string }>
}

export default async function FlowPage({ params }: FlowPageProps) {
  const { flowId } = await params
  return <FlowWorkspace flowId={flowId} />
}
