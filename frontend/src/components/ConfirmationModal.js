import React from 'react'
import { Modal, Button } from 'react-bootstrap'

function ConfirmationModal({showModal, ModalTitle, hideModal, confirmModal, catid, cid, uid, pid, message, variantBtnDel}) {
    return (
        <Modal size="md" show={showModal} onHide={hideModal}>
            <Modal.Header>
                <Modal.Title>{ModalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <div className="">{message}</div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="default" onClick={hideModal}>
                    Cancel
                </Button>
                {cid ? (
                    <Button variant={variantBtnDel} onClick={() => confirmModal(cid)} >
                        Delete
                    </Button>    
                ):(<span></span>)}

                {pid ? (
                    <Button variant={variantBtnDel} onClick={() => confirmModal(pid)} >
                        Delete
                    </Button>
                ):(<span></span>)}
                {uid ? (
                    <Button variant={variantBtnDel} onClick={() => confirmModal(uid)} >
                        Delete
                    </Button>
                ):(<span></span>)}

                {catid ? (
                    <Button variant={variantBtnDel} onClick={() => confirmModal(catid)} >
                        Delete
                    </Button>
                ):(<span></span>)}
                
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmationModal
