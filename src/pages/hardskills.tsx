// If you don't want to use TypeScript you can delete this file!
import * as React from "react"
import { PageProps, Link, graphql, HeadFC } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import Skill from "../components/skill"

import { FaReact } from 'react-icons/fa';
import { SiPython, SiJavascript, SiRaspberrypi, SiCss3, SiHtml5, SiLinux, SiMysql, SiCplusplus, SiBootstrap, SiPhp, SiDocker, SiPandas } from 'react-icons/si';
import { DiDjango, DiNodejsSmall } from 'react-icons/di';
import { TbBrandNextjs } from 'react-icons/tb';
import { FiDatabase } from 'react-icons/fi';

const ICONS_SIZE = 64


type DataProps = {
  site: {
    buildTime: string
  }
}


const skills = [
  {
    name : "ReactJS",
    icon : <FaReact size={ICONS_SIZE}/>,
    experience : 3
  },
  {
    name : "Python",
    icon : <SiPython size={ICONS_SIZE}/>,
    experience : 3
  },
  {
    name : "JavaScript",
    icon : <SiJavascript size={ICONS_SIZE}/>,
    experience : 3
  },
  {
    name : "DJango",
    icon : <DiDjango size={ICONS_SIZE}/>,
    experience : 4
  },
  {
    name : "Raspberry",
    icon : <SiRaspberrypi size={ICONS_SIZE}/>,
    experience : 4
  },
  {
    name : "CSS3",
    icon : <SiCss3 size={ICONS_SIZE}/>,
    experience : 4
  },
  {
    name : "HTML5",
    icon : <SiHtml5 size={ICONS_SIZE}/>,
    experience : 4
  },
  {
    name : "NodeJS",
    icon : <DiNodejsSmall size={ICONS_SIZE}/>,
    experience : 4
  },
  {
    name : "Linux",
    icon : <SiLinux size={ICONS_SIZE}/>,
    experience : 4
  },
  {
    name : "MySQL",
    icon : <SiMysql size={ICONS_SIZE}/>,
    experience : 4
  },
  {
    name : "C++",
    icon : <SiCplusplus size={ICONS_SIZE}/>,
    experience : 4
  },
  {
    name : "Bootstrap",
    icon : <SiBootstrap size={ICONS_SIZE}/>,
    experience : 4
  },
  {
    name : "Php",
    icon : <SiPhp size={ICONS_SIZE}/>,
    experience : 4
  },
  {
    name : "NextJS",
    icon : <TbBrandNextjs size={ICONS_SIZE}/>,
    experience : 4
  },
  {
    name : "Docker",
    icon : <SiDocker size={ICONS_SIZE}/>,
    experience : 4
  },
  {
    name : "Big Data",
    icon : <FiDatabase size={ICONS_SIZE}/>,
    experience : 4
  },
  {
    name : "Pandas",
    icon : <SiPandas size={ICONS_SIZE}/>,
    experience : 4
  }
]


const Index: React.FC<PageProps<DataProps>> = ({
  data,
  path,
  location,
}) => {

  const [skillInputValue, setSkillInputValue] = React.useState("");

  const filteredSkills = () => {
    
    let values = skills.filter(skill => skill.name.toLowerCase().includes(skillInputValue))

    values = values.map(skill => {
      return skill.name.toLocaleLowerCase().includes(skillInputValue) && (
        <Skill {...skill}/>
      )
    });

    console.log(values)

    return values.length !== 0 ? 
      <div className="skills">{values}</div> : 
      <h2 className="notSkillValues">Ups... There is not values...</h2>

  };

  return (
    <Layout title="Using TypeScript" location={location}>
      <div>
        <h1>🛠 Hard Skills</h1>
        <input className="hardSkillSearch" placeholder="Filtrar" onChange={(e : React.ChangeEvent<HTMLInputElement>) => { setSkillInputValue(e.target.value.toLowerCase()) }}/>
          {filteredSkills()}
      </div>
    </Layout>
  )

}

export const Head: HeadFC<DataProps> = () => <Seo title="Using TypeScript" />

export default Index

export const query = graphql`
  {
    site {
      buildTime(formatString: "YYYY-MM-DD hh:mm a z")
    }
  }
`
