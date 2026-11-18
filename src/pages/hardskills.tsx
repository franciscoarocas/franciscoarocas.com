import * as React from "react"
import Redirect, { RedirectHead } from "../components/Redirect"

const TO = "/#servicios"
const Page: React.FC = () => <Redirect to={TO} />
export const Head = () => <RedirectHead to={TO} />
export default Page
