import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import xmlToJson from 'xml-to-json-stream'
import { loadXML } from '../actions'

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
    <div>
      <input type='file'
             id='file'
             className='input-file'
             accept='.xml'
             onChange={e => handleFileChosen(e.target.files[0])}
      />
    </div>
    
  )
}

const mapStateToProps = store => ({
  gamelist: store.gamelistState.gamelist
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadXML }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FileBodyComponent)