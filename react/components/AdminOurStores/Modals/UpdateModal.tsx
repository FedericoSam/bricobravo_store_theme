import React from 'react';
import {
    Modal,
    Input,
    Button,
  } from 'vtex.styleguide';
import axios from 'axios'

interface UpdateModalProps {
    setRegionValue: (regionValue: string) => void
    setItemsTable: (itemsTable: any[]) => void
    setIsUpdateModalOpen: (isUpdateModalOpen: boolean) => void
    regionValue: string
    itemsTable: any
    isUpdateModalOpen: boolean
    documentId: string
}

const UpdateModal: React.FC<UpdateModalProps> = ({
    setRegionValue,
    setItemsTable,
    setIsUpdateModalOpen,
    regionValue,
    itemsTable,
    isUpdateModalOpen,
    documentId
}) => {

    const updateRegion = (documentId: any) => {
        axios
          .put(`/api/dataentities/ourstore/documents/${documentId}`, {
            storeRegion: regionValue,
          })
          .then(function (response) {
            console.log(response)
            const newItemsTable = [...itemsTable]
            const itemToUpdateIndex = newItemsTable.findIndex(
              (nit) => nit.id === documentId
            )

            if (itemToUpdateIndex !== -1) {
              newItemsTable[itemToUpdateIndex].storeRegion = regionValue
              setItemsTable(newItemsTable)
            }

            setIsUpdateModalOpen(false)
          })
          .catch(function (error) {
            console.log(error)
          })
      }

    return( 
      <Modal
        isOpen={isUpdateModalOpen}
        responsiveFullScreen
        title="Editar Região"
        bottomBar={
          <div className="nowrap">
            <span className="mr4">
              <Button
                variation="tertiary"
                onClick={() => setIsUpdateModalOpen(false)}
              >
                Cancelar
              </Button>
            </span>
            <span>
              <Button
                variation="primary"
                onClick={() => updateRegion(documentId)}
              >
                Salvar
              </Button>
            </span>
          </div>
        }
        onClose={() => setIsUpdateModalOpen(false)}
      >
        <div className="flex justify-center">
          <div className="w-100 mv4 pv6-ns pl6-ns">
            <div className="w-100 mv6">
              <Input
                placeholder="Ex: Litoral do Paraná"
                size="large"
                label="Cidade/Região"
                onChange={(event: any) => setRegionValue(event.target.value)}
                value={regionValue}
              />
            </div>
          </div>
        </div>
      </Modal>
    )
}

export default UpdateModal
