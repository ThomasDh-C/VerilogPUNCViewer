import React from 'react'
import parse from './vcd-parser'
import styled from 'styled-components'

const ThickBaseDiv = styled.div`
padding-top: 60px;
padding-bottom: 20px;
margin-left: auto;
margin-right: auto;
`

const ImportFromFile = (props) => {
    let fileReader;

    // parse data from input and store it
    const handleFileRead = (e) => {
        const content = fileReader.result;
        parse(content)
            .then(parsedData => {
                props.setVCD(parsedData)
            })
            .catch(err => {
                console.error(err);
            })
    }

    // parse raw file and send it to parser
    const handleFileChosen = (file) => {
        fileReader = new FileReader()
        fileReader.onloadend = handleFileRead
        fileReader.readAsText(file)
    }

    return (
        <ThickBaseDiv>
            <input type='file'
                id='file'
                accept='.vcd'
                onChange={e => handleFileChosen(e.target.files[0])}
            />
        </ThickBaseDiv>)
};


export default ImportFromFile