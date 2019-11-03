import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { ClassicSpinner } from 'react-spinners-kit'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import xmlToJson from 'xml-to-json-stream'
import { Level, File, Icon } from 'rbx'
import { FaUpload } from 'react-icons/fa'
import md5 from 'md5'
import { loadXML, setBasePath } from '../actions'

const FileBodyComponent = ({ loadXML, setBasePath }) => {
  const [isLoading, setIsLoading] = useState(false)

  const parser = xmlToJson({ attributeMode: true })
  let fileReader

  const handleFileRead = (e) => {
    const content = fileReader.result
    parser.xmlToJson(content, (err, json) => {
      if (err) {
        toast.error(err.message)
        setIsLoading(false)
        return false
      }

      json.gameList.game.forEach((g, i, arr) => arr[i].md5 = md5(g.path))
      loadXML(json)
      setIsLoading(false)
    })
  }

  const handleFileChosen = (file) => {
    setIsLoading(true)
    if (file === undefined) {
      setIsLoading(false)
      setBasePath('')
      return false
    }

    fileReader = new FileReader()
    fileReader.onloadend = handleFileRead
    fileReader.readAsText(file)
    setBasePath(file.path)
  }

  return (
    <Level>
      <Level.Item align="left">
        <File color="info" hasName>
          <File.Label>
            <File.Input accept=".xml" onChange={e => handleFileChosen(e.target.files[0])} />
            <File.CTA>
              <File.Icon>
                <Icon size="small" color="white">
                  <FaUpload />
                </Icon>
              </File.Icon>
              <File.Label as="span">Selecione um XML</File.Label>
            </File.CTA>
            <File.Name>gamelist.xml</File.Name>
          </File.Label>
        </File>
      </Level.Item>

      <Level.Item align="right">
        <ClassicSpinner
          size={30}
          color="#686769"
          loading={isLoading}
        />
      </Level.Item>
    </Level>
  )
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadXML, setBasePath }, dispatch)

export default connect(null, mapDispatchToProps)(FileBodyComponent)