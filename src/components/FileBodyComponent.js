import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import xmlToJson from 'xml-to-json-stream'
import { loadXML } from '../actions'
import { Level, File, Icon } from 'rbx'
import { FaUpload } from 'react-icons/fa'

const FileBodyComponent = ({ gamelist, loadXML }) => {
  const parser = xmlToJson({attributeMode:true})
  let fileReader

  const handleFileRead = (e) => {
    const content = fileReader.result
    parser.xmlToJson(content, (err,json) => {
      if (err) {
        console.log(err)
        return false
      }

      loadXML(json)
    })
  }

  const handleFileChosen = (file) => {
    fileReader = new FileReader()
    fileReader.onloadend = handleFileRead
    fileReader.readAsText(file)
  }

  return (
    <Level>
      <Level.Item align='left'>
        <File color='info' hasName>
          <File.Label>
            <File.Input accept='.xml' onChange={e => handleFileChosen(e.target.files[0])} />
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
    </Level>
  )
}

const mapStateToProps = store => ({
  gamelist: store.gamelistState.gamelist
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadXML }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FileBodyComponent)