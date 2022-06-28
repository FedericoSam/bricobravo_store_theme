import React from 'react';
import {
    Modal,
    Button,
  } from 'vtex.styleguide';
import axios from 'axios'

interface DeleteModalProps {
    setItemsTable: (itemsTable: any[]) => void
    setIsDeleteModalOpen: (isDeleteModalOpen: boolean) => void
    itemsTable: any
    isDeleteModalOpen: boolean
    documentId: string
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    setItemsTable,
    setIsDeleteModalOpen,
    itemsTable,
    isDeleteModalOpen,
    documentId
}) => {

    const removeRegion = (documentId: any) => {
        axios
          .delete(`/api/dataentities/ourstore/documents/${documentId}`)
          .then(function (response) {
            console.log(response)
            const newItemsTable = itemsTable.filter((it: any) => it.id !== documentId)

            setItemsTable(newItemsTable)
            setIsDeleteModalOpen(false)
          })
          .catch(function (error) {
            console.log(error)
          })
      }

    return(
        <Modal
        isOpen={isDeleteModalOpen}
        responsiveFullScreen
        title="Excluir Região"
        bottomBar={
          <div className="nowrap">
            <span className="mr4">
              <Button
                variation="tertiary"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Não
              </Button>
            </span>
            <span>
              <Button
                variation="danger"
                onClick={() => removeRegion(documentId)}
              >
                Sim
              </Button>
            </span>
          </div>
        }
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div className="flex justify-center">
          <div className="w-100 mv4 pv6-ns pl6-ns">
            <div className="w-100 mv6">
              <h3>
                Você tem certeza que quer excluir esse item? Vai excluir as
                lojas cadastradas também!
              </h3>
            </div>
          </div>
        </div>
      </Modal>
    )
}

export default DeleteModal
