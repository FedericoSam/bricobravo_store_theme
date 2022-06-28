import React from 'react';
import {
    Modal,
    Input,
    Button,
  } from 'vtex.styleguide';
import axios from 'axios'

interface CreateModalProps {
    setRegionValue: (regionValue: string) => void
    setItemsTable: (itemsTable: any[]) => void
    setIsCreateModalOpen: (isCreateModalOpen: boolean) => void
    regionValue: string
    itemsTable: any
    isCreateModalOpen: boolean
}

const CreateModal: React.FC<CreateModalProps> = ({
    setRegionValue,
    setItemsTable,
    setIsCreateModalOpen,
    regionValue,
    itemsTable,
    isCreateModalOpen
}) => {

    const createRegion = () => {
        axios
          .put('/api/dataentities/ourstore/documents?_schema=v1', {
            storeRegion: regionValue,
          })
          .then(function (response) {
            console.log(response)
            const newItemTable = {
              id: response.data.DocumentId,
              pickupPoints: null,
              storeRegion: regionValue,
            }
    
            setItemsTable([...itemsTable, newItemTable])
            setIsCreateModalOpen(false)
          })
          .catch(function (error) {
            console.log(error)
          })
      }

    return(
        <Modal
        isOpen={isCreateModalOpen}
        responsiveFullScreen
        bottomBar={
          <div className="nowrap">
            <span className="mr4">
              <Button
                variation="tertiary"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancelar
              </Button>
            </span>
            <span>
              <Button variation="primary" onClick={() => createRegion()}>
                Salvar
              </Button>
            </span>
          </div>
        }
        onClose={() => setIsCreateModalOpen(false)}
      >
        <div className="flex justify-center">
          <div className="w-100 mv4 pv6-ns pl6-ns">
            <div className="w-100 mv6">
              <Input
                placeholder="Ex: Litoral do Paraná"
                size="large"
                label="Cidade/Região"
                onChange={(event: any) => setRegionValue(event.target.value)}
              />
            </div>
          </div>
        </div>
      </Modal>
    )
}

export default CreateModal
