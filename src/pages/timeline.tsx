// If you don't want to use TypeScript you can delete this file!
import * as React from "react"
import { PageProps, Link, graphql, HeadFC } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { FormattedMessage } from 'react-intl';

import TimeLineItem from "../components/timeLimeItem"

type DataProps = {
  site: {
    buildTime: string
  }
}

const TimeLine: React.FC<PageProps<DataProps>> = ({
  data,
  path,
  location,
}) => {

  return (
    <Layout title="TimeLine" location={location}>
      <div className="content">
        <h1 style={{marginBottom : '3rem'}}>⏱ TimeLine</h1>
        <TimeLineItem
          name={<FormattedMessage id="gtc_title"/>}
          period={<FormattedMessage id="gtc_period"/>}
          description={
            <>
              <p><FormattedMessage id="gtc_p1"/></p>
              <p><FormattedMessage id="gtc_p2"/></p>
              <ul>
                <li><FormattedMessage id="gtc_l1_i1"/></li>
                <li><FormattedMessage id="gtc_l1_i2"/></li>
                <li><FormattedMessage id="gtc_l1_i3"/></li>
                <li><FormattedMessage id="gtc_l1_i4"/></li>
                <li><FormattedMessage id="gtc_l1_i5"/></li>
              </ul>
            </>
          }
        />
        <TimeLineItem
          name={<FormattedMessage id="fred_title"/>}
          period={<FormattedMessage id="fred_period"/>}
          description={
            <>
              <p><FormattedMessage id="fred_p1"/></p>
              <ul>
                <li><FormattedMessage id="fred_l1_i1"/></li>
                <li><FormattedMessage id="fred_l1_i2"/></li>
                <li><FormattedMessage id="fred_l1_i3"/></li>
                <li><FormattedMessage id="fred_l1_i4"/></li>
              </ul>
              <p><FormattedMessage id="fred_p2"/></p>
            </>
          }
        />
        <TimeLineItem
          name={<FormattedMessage id="cab_title"/>}
          period={<FormattedMessage id="cab_period"/>}
          description={<p><FormattedMessage id="cab_p1"/></p>}
        />
      </div>
    </Layout>
  )

}

export const Head: HeadFC<DataProps> = () => <Seo title="TimeLine" />

export default TimeLine
