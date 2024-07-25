import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const List = () => {
    const [files, setFiles] = useState([])
    const [message, setMessage] = useState('')
    const navigate = useNavigate()


    const navigateToUpload = () => {
        navigate('/upload')
    }

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch('https://localhost:7172/api/Upload/files')

                if(response.ok) {

                    const data = await response.json()

                    const allowedExtensions = ["pdf", "docx"]

                    const filtered = data.filter(file => {
                        const extension = file.split('.').pop().toLowerCase()
                        return allowedExtensions.includes(extension)
                    }).map(file => {
                        const extension = file.split('.').pop().toLowerCase()
                        const part = file.split('.')
                        part.pop()
                        const name = part.join('.')
                        return {filePath : file, extension, name}
                    })

                    setFiles(filtered)

                    
                    if(filtered.length === 0) {
                        setMessage('Le repertoire est vide.')
                    }

                    console.log('files fetched successfully')

                } else {
                    console.error('failed to fetch files')
                }
            } catch(e) {
                console.error('Failed: ', e)
            }
        }

        fetchFiles()
    }, [])

    return (
        <div className="container">
            <h2 className="alert alert-dark my-3">Liste des fichiers chargés</h2>
            <FileTable files={files} />

            <div>{message}</div>

            <div className="d-flex justify-content-center">
                <button className="btn btn-light" onClick={navigateToUpload} >Charger des fichier (docx, pdf) </button>
            </div>
        </div>
    )
}


function FileRow({file}) {
    const route  = file.extension === 'pdf' ? 'pdf' : 'docx'
    const fileUrl = `https://localhost:7172/files/${route}/${file.filePath}`
  
        return <tr>
          <td>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">{file.name}</a>
          </td>
          <td>{file.extension}</td>
       </tr>
  
}

function FileTable({files}) {

    return <table className="container table">
        <thead>
            <tr>
                <th>Files</th>
                <th>Extensions</th>
            </tr>
        </thead>
        <tbody>
                {(
                    files.map(file => (
                        <FileRow key={file.name} file={file} />
                    ))
                )}
           
        </tbody>
    </table>
}

export default List