import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"
import login from "app/auth/mutations/login"
import { LoginInput, LoginInputType } from "app/auth/validations"
const ITEMS_PER_PAGE = 100

const loginForm = () => {
  return (
    <div className="base-container">
      <div className="header">Login</div>
      <div className="content">
        <div className="form">
          <div className="formGroup">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="username" />
          </div>
          <div className="form">
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" />
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button" className="btn">
          Login
        </button>
      </div>
    </div>
  )
}
type LoginFormProps = {
  onSuccess?: () => void
}
const UserInfo = (props: LoginFormProps) => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logout()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <Form<LoginInputType>
        submitText="Log In"
        schema={LoginInput}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await login({ email: values.email, password: values.password })
            props.onSuccess && props.onSuccess()
          } catch (error) {
            if (error.name === "AuthenticationError") {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>
    )
  }
}

const HomePage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <main>
        <div>
          <p>Hoi, welkom op deze pagina!</p>
          <Link href="/Fietsen">
            <a>Klik Deze Link!</a>
          </Link>
        </div>
      </main>
    </div>
  )
}
HomePage.getLayout = (page) => <Layout title={"Home"}>{page}</Layout>
export default HomePage
