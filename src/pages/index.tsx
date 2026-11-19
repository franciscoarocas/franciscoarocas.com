import * as React from "react"
import type { HeadFC } from "gatsby"

import Landing from "../components/site/Landing"
import Seo from "../components/seo"
import { t } from "../data/strings"

const Index: React.FC = () => <Landing />

export const Head: HeadFC = () => <Seo title={t("es").seo.title} description={t("es").seo.description} />

export default Index
