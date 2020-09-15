import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getQuestions from "app/questions/queries/getQuestions"
import updateChoice from "app/choices/mutations/updateChoice"

const ITEMS_PER_PAGE = 100

export const QuestionsList = () => {
  return (
    <div>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <Link href="/questions/[questionId]" as={`/questions/${question.id}`}>
              <a>{question.text}</a>
            </Link>
            <ul>
              {question.choices.map((choice) => (
                <li key={choice.id}>
                  {choice.text} - {choice.votes} votes
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const ButtonCreator = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ questions, hasMore }] = usePaginatedQuery(getQuestions, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })
  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })
  return (
    <div style={{ position: "absolute", bottom: "0" }}>
      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const QuestionsPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Questions</title>
      </Head>

      <main>
        <h1>Questions</h1>

        <p>
          <Link href="/questions/new">
            <a>Create Question</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ButtonCreator />
        </Suspense>
      </main>
    </div>
  )
}

QuestionsPage.getLayout = (page) => <Layout title={"Questions"}>{page}</Layout>

export default QuestionsPage
