import React from 'react'
import ReactMarkdown from "react-markdown/with-html";

const SyllabusLink = ({ link }) => {
  return (
    <>
      <ReactMarkdown source={link.syllabusLink2} escapeHtml={false}/>
    </>
  )
}

export default SyllabusLink
