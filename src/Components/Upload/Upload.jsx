import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FailedNotify, SuccessNotify } from "../Notifications/notification"

const FileUpload = () => {
    const [file, setFile] = useState(null)
    const [message, setMessage] = useState('')
    const [validate, setValidate] = useState(false)
    const [failed, setFailed] = useState(false)
    const navigate = useNavigate()

    const navigateToList = () => {
        navigate('/list')
    }

    const fileChange = (e) => {
        const selectedFiles = e.target.files[0]

        setFile(selectedFiles)
        
    }

    const Upload = async () => {
        const formData = new FormData()

        formData.append('file', file)

        const response = await fetch('https://localhost:7172/api/Upload/upload', {
            method: 'POST',
            body: formData
        })

        if(response.ok)    setValidate(true)
            else    setFailed(true)
    }

    useEffect(() => {
        if(validate) {
            const timer = setTimeout(() => {
                setValidate(false)
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [validate])

    useEffect(() => {
        if(failed) {
            const timer = setTimeout(() => {
                setFailed(false)
            }, 10000)
            return () => clearTimeout(timer)
        }
    }, [failed])

    return (
        <div className="container">
            <h2 className="alert alert-dark my-3">Charger des fichiers</h2>
            <input type="file" onChange={fileChange} className="form-control my-2" />
            <button onClick={Upload} className="btn btn-success my-2" disabled={!file}>Upload</button>
            {validate && <SuccessNotify />}
            {failed && <FailedNotify />}

            <div className="d-flex justify-content-center">
                <button className="btn btn-light" onClick={navigateToList} >Voir les fichiers chargés </button>
            </div>
            <p className="alert alert-warning my-3">NB : docx, pdf uniquement</p>
        </div>
    )
}

export default FileUpload