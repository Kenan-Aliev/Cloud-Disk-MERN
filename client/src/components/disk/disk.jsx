import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile} from "../../actions/file";
import FileList from "./fileList/FileList";
import './disk.css'
import Popup from "./Popup";
import {setCurrentDir, setPopupDisplay} from "../../reducers/fileReducer";

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(s=>s.files.currentDir)
    const dirStack = useSelector(s=>s.files.dirStack)
    const [dragEnter,setDragEnter] = useState(false)
    useEffect(()=>{
        dispatch(getFiles(currentDir))
    },[dispatch,currentDir])
    function showPopupHandler(){
        dispatch(setPopupDisplay('flex'))
    }

    function backClickHandler(){
    const backDirId = dirStack.pop()
    dispatch(setCurrentDir(backDirId))
    }

    function fileUploadHandler(event){
        const files = [...event.target.files]
        files.forEach(file=>dispatch(uploadFile(file,currentDir)))

    }

    function dragEnterHandler(event){
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }

    function dragLeaveHandler(event){
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }
   function dropHandler(event){
       event.preventDefault()
       event.stopPropagation()
       let files = [...event.dataTransfer.files]
       files.forEach(file => dispatch(uploadFile(file,currentDir)))
       setDragEnter(false)
   }

    return (!dragEnter ?
            <div className='disk'
                 onDragEnter={(e) => dragEnterHandler(e)}
                 onDragLeave={(e) => dragLeaveHandler(e)}
                 onDragOver={(e) => dragEnterHandler(e)}
            >
            <div className="disk__btns">
                <button className="disk__back" onClick={()=>backClickHandler()}>
                  Назад
                </button>
                <button className="disk__create" onClick={()=>showPopupHandler()}>
                 Создать папку
                </button>
                <div className="disk__upload">
                    <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                    <input multiple={true} type="file"
                           id='disk__upload-input'
                           onChange={(e)=>fileUploadHandler(e)}
                           className="disk__upload-input"/>
                </div>
            </div>
                <FileList/>
                <Popup/>
        </div>
            :
            <div
                className='drop-area'
                onDrop={(e) => dropHandler(e)}
                onDragEnter={(e) => dragEnterHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragOver={(e) => dragEnterHandler(e)}
            >
                Перетащите файлы сюда
            </div>
    );
};

export default Disk;