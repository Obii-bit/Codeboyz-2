import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"

const ITEMS_PER_PAGE = 100
const FietsenPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Fietsen</title>
      </Head>
      <main>
        <div>
          <p>Hoi, welkom op deze pagina!</p>
        </div>
      </main>
    </div>
  )
}
FietsenPage.getLayout = (page) => <Layout title={"Fietsen"}>{page}</Layout>
export default FietsenPage
