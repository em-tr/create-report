import React, {Component}from 'react';
import {TextField} from '@material-ui/core';
import UploadService from "../services/uploadFiles.service";
import Progress from "./layouts/Progress";
import Alert from "./layouts/Alert";
import Button from "./layouts/Button";

export default class CreateReport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFiles: undefined,
            currentFiles: undefined,
            progress: 0,      
            message: "",
        }
        this.hiddenFileInput = React.createRef();
    }

    handleClick = () => {
        this.hiddenFileInput.current.click();
    }

   
    /* selectFile = (e) => {
        this.setState({
            selectedFiles: [...this.state.selectedFiles, {[e.target.name]: e.target.files}]
        }, () => {
            console.log(this.state);
        });
    } */

    selectFile = (event) => {
        console.log(event.target.files);
        
        this.setState({
          selectedFiles: event.target.files,
        });
      }

    upload = () => {
        let currentFile = this.state.selectedFiles[0];

        console.log(currentFile);
    
        this.setState({
          progress: 0,
          currentFile: currentFile,
        });
    
        UploadService.upload(currentFile, (event) => {
          this.setState({
            progress: Math.round((100 * event.loaded) / event.total),
          });
        })
          .then((response) => {
            this.setState({
              message: response.data.message,
            });
          })
          .catch(() => {
            this.setState({
              progress: 0,
              message: "Could not upload the file!",
              currentFile: undefined,
            });
          });
    
        this.setState({
          selectedFiles: undefined,
        });
      }

    render() {
        const {
            selectedFiles,
            currentFile,
            progress,
            message,
          } = this.state;
        return (
            <div className="container">
                {currentFile && <Progress value={progress}/>}
            <TextField required id="sprintNr" label="Sprint Nr." variant="filled" fileparam="sprintNr" />
            <Button variant="contained" color="primary" onClick={this.handleClick}>
                Datei auswählen
                <input type="file" hidden name="sprintNr" ref={this.hiddenFileInput} onChange={this.selectFile} />
            </Button>
            <Button variant="contained" color="primary" onClick={this.upload} disabled={!selectedFiles}>Upload</Button>
            {message ? <Alert severity="info" >{message}</Alert> : ''}
            </div>
        )
        
    }
}