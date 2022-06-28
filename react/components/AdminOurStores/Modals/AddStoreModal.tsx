import React from 'react';
import {
    Modal,
    Button,
    EXPERIMENTAL_Select,
  } from 'vtex.styleguide';
import axios from 'axios'

interface AddStoreModalProps {
    setItemsTable: (itemsTable: any[]) => void
    setIsAddStoreModalOpen: (isAddStoreModalOpen: boolean) => void
    setSelectedStores: (selectedStores: any) => void
    regionValue: string
    selectedStores: any
    itemsTable: any
    isAddStoreModalOpen: boolean
    dropdownStores: any[]
    documentId: string
}

const AddStoreModal: React.FC<AddStoreModalProps> = ({
    setItemsTable,
    setIsAddStoreModalOpen,
    setSelectedStores,
    regionValue,
    selectedStores,
    itemsTable,
    dropdownStores,
    isAddStoreModalOpen,
    documentId
}) => {


    const dropdownStoreItems = dropdownStores.map((item: any) => ({
        value: { id: item.id, name: item.name },
        label: item.name,
      }))
    
    const addStoreToRegion = (documentId: any) => {
    axios
        .put(`/api/dataentities/ourstore/documents/${documentId}`, {
        storeRegion: regionValue,
        pickupPoints: selectedStores,
        })
        .then(function (response) {
        console.log(response)
        const newItemsTable = [...itemsTable]
        const itemToUpdateIndex = newItemsTable.findIndex(
            (nit) => nit.id === documentId
        )

        if (itemToUpdateIndex !== -1) {
            newItemsTable[itemToUpdateIndex].pickupPoints = selectedStores
            setItemsTable(newItemsTable)
        }

        setIsAddStoreModalOpen(false)
        })
        .catch(function (error) {
        console.log(error)
        })
    }

    return( 
      <Modal
        isOpen={isAddStoreModalOpen}
        responsiveFullScreen
        title={`Adicionar Loja para região: ${regionValue}`}
        bottomBar={
          <div className="nowrap">
            <span className="mr4">
              <Button
                variation="tertiary"
                onClick={() => setIsAddStoreModalOpen(false)}
              >
                Cancelar
              </Button>
            </span>
            <span>
              <Button
                variation="primary"
                onClick={() => addStoreToRegion(documentId)}
              >
                Salvar
              </Button>
            </span>
          </div>
        }
        onClose={() => setIsAddStoreModalOpen(false)}
      >
        <div className="flex justify-center">
          <div className="w-100 mv4 pv6-ns pl6-ns">
            <div className="w-100 mv6">
              <EXPERIMENTAL_Select
                defaultValue={selectedStores}
                multi
                size="regular"
                label="Lojas cadastradas"
                options={dropdownStoreItems}
                onChange={(values: any) => {
                  setSelectedStores(values)
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    )
}

export default AddStoreModal
