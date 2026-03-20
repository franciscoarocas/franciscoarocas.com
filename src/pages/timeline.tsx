import * as React from "react"
import { PageProps, HeadFC } from "gatsby"
import { FormattedMessage } from "react-intl"

import Layout from "../components/layout"
import Seo from "../components/seo"
import TimeLineItem from "../components/timeLimeItem"

type DataProps = {
  site: {
    buildTime: string
  }
}

const TimeLine: React.FC<PageProps<DataProps>> = ({ location }) => {
  return (
    <Layout title="TimeLine" location={location}>
      <div className="content">
        <h1 style={{ marginBottom: "3rem" }}>
          <FormattedMessage id="timeLine" />
        </h1>

        <TimeLineItem
          name={<FormattedMessage id="fund360_title" />}
          period={<FormattedMessage id="fund360_period" />}
          description={
            <>
              <p>
                <FormattedMessage id="fund360_p1" />
              </p>
              <ul>
                <li>
                  <FormattedMessage id="fund360_l1_i1" />
                </li>
                <li>
                  <FormattedMessage id="fund360_l1_i2" />
                </li>
                <li>
                  <FormattedMessage id="fund360_l1_i3" />
                </li>
                <li>
                  <FormattedMessage id="fund360_l1_i4" />
                </li>
                <li>
                  <FormattedMessage id="fund360_l1_i5" />
                </li>
              </ul>
            </>
          }
        />

        <TimeLineItem
          name={<FormattedMessage id="gtc_title" />}
          period={<FormattedMessage id="gtc_period" />}
          description={
            <>
              <p>
                <FormattedMessage id="gtc_p1" />
              </p>
              <ul>
                <li>
                  <FormattedMessage id="gtc_l1_i1" />
                </li>
                <li>
                  <FormattedMessage id="gtc_l1_i2" />
                </li>
                <li>
                  <FormattedMessage id="gtc_l1_i3" />
                </li>
                <li>
                  <FormattedMessage id="gtc_l1_i4" />
                </li>
              </ul>
            </>
          }
        />

        <TimeLineItem
          name={<FormattedMessage id="ull_title" />}
          period={<FormattedMessage id="ull_period" />}
          description={
            <>
              <p>
                <FormattedMessage id="ull_p1" />
              </p>
              <ul>
                <li>
                  <FormattedMessage id="ull_l1_i1" />
                </li>
                <li>
                  <FormattedMessage id="ull_l1_i2" />
                </li>
                <li>
                  <FormattedMessage id="ull_l1_i3" />
                </li>
                <li>
                  <FormattedMessage id="ull_l1_i4" />
                </li>
              </ul>
            </>
          }
        />

        <TimeLineItem
          name={<FormattedMessage id="fred_title" />}
          period={<FormattedMessage id="fred_period" />}
          description={
            <>
              <p>
                <FormattedMessage id="fred_p1" />
              </p>
              <ul>
                <li>
                  <FormattedMessage id="fred_l1_i1" />
                </li>
                <li>
                  <FormattedMessage id="fred_l1_i2" />
                </li>
                <li>
                  <FormattedMessage id="fred_l1_i3" />
                </li>
                <li>
                  <FormattedMessage id="fred_l1_i4" />
                </li>
              </ul>
              <p>
                <FormattedMessage id="fred_p2" />
              </p>
            </>
          }
        />

        <TimeLineItem
          name={<FormattedMessage id="cab_title" />}
          period={<FormattedMessage id="cab_period" />}
          description={
            <>
              <p>
                <FormattedMessage id="cab_p1" />
              </p>
              <ul>
                <li>
                  <FormattedMessage id="cab_l1_i1" />
                </li>
                <li>
                  <FormattedMessage id="cab_l1_i2" />
                </li>
                <li>
                  <FormattedMessage id="cab_l1_i3" />
                </li>
              </ul>
            </>
          }
        />
      </div>
    </Layout>
  )
}

export const Head: HeadFC<DataProps> = () => <Seo title="TimeLine" />

export default TimeLine
