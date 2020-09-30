import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Head, BlitzPage } from "blitz"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"
import login from "app/auth/mutations/login"
import { LoginInput, LoginInputType } from "app/auth/validations"
import { CurrentUser } from "./CurrentUser"
type LoginFormProps = {
  onSuccess?: () => void
  onLogOut?: () => void
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
            if (props.onLogOut) {
              props.onLogOut()
            }
          }}
        >
          Logout
        </button>
        <div>
          <p>
            Hallo {currentUser.email}!, Welkom op de site! Uw UserID is:
            <code>{currentUser.id}</code>. Uw UserRole is: <code>{currentUser.role}</code>
          </p>
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
            if (props.onSuccess) {
              props.onSuccess()
            }
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
      <Suspense fallback="Loading...">
        <CurrentUser />
      </Suspense>
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
      <main>
        <div>
          <p>Hoi, welkom op deze pagina!</p>
        </div>
      </main>
    </div>
  )
}

HomePage.getLayout = (page) => <Layout title={"Home"}>{page}</Layout>
export default HomePage
