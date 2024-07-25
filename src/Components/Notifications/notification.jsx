import './notifications.css'

export const SuccessNotify = () => {
    return <div className='d-flex justify-content-center'>
        <div className='notif-box my-5 alert alert-success'>
            <p className='text-center'>Fichier téléchargé avec succes</p>
        </div>
    </div>
}

export const FailedNotify = () => {
    return <div className='d-flex justify-content-center'>
        <div className='notif-box2 my-5 alert alert-danger'>
            <p className='text-center'>Téléchargement du fichier échoué, assurez vous qu'il est dans le bon format</p>
        </div>
    </div>
}