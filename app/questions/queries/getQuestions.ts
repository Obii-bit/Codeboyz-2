import { SessionContext } from "blitz"
import db, { FindManyQuestionArgs } from "db"

type GetQuestionsInput = {
  where?: FindManyQuestionArgs["where"]
  orderBy?: FindManyQuestionArgs["orderBy"]
  skip?: FindManyQuestionArgs["skip"]
  take?: FindManyQuestionArgs["take"]
  // Only available if a model relationship exists
  // include?: FindManyQuestionArgs['include']
}

export default async function getQuestions(
  { where, orderBy, cursor, take, skip }: GetQuestionsInput,
  ctx: Record<any, any> = {}
) {
  const questions = await db.question.findMany({
    where,
    orderBy,
    cursor,
    take,
    skip,
    include: { choices: true },
  })

  const count = await db.question.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    questions,
    nextPage,
    hasMore,
  }
}
