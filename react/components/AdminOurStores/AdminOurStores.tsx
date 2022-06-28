import React, { useState, useEffect } from 'react'
import {
  PageBlock,
  Table,

} from 'vtex.styleguide'
import axios from 'axios'
import CreateModal from './Modals/CreateModal'
import UpdateModal from './Modals/UpdateModal'
import DeleteModal from './Modals/RemoveModal'
import AddStoreModal from './Modals/AddStoreModal'

const AdminOurStores: React.FC = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isAddStoreModalOpen, setIsAddStoreModalOpen] = useState(false)
    const [dropdownStores, setDropdownStores] = useState([])
    const [selectedStores, setSelectedStores] = useState([])
    const [documentId, setDocumentId] = useState('')
    const [regionValue, setRegionValue] = useState('')
    const [itemsTable, setItemsTable] = useState<
        Array<{ id: string; pickupPoints: any; storeRegion: string }>
    >([])

  const getRegion = async () => {
    await axios
      .get(
        '/api/dataentities/ourstore/search?_schema=v1&_fields=id,storeRegion,pickupPoints'
      )
      .then(function (response) {
        setItemsTable(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const getPickupPoint = async () => {
    await axios
      .get(`/api/logistics/pvt/configuration/pickuppoints`)
      .then((res: any) => {
        setDropdownStores(res.data)
      })
  }

  const lineActions = [
    {
      label: () => `Adicionar Loja`,
      onClick: ({ rowData }: any) => {
        setIsAddStoreModalOpen(true)
        getPickupPoint()
        setDocumentId(rowData.id)
        setRegionValue(rowData.storeRegion)
        setSelectedStores(rowData.pickupPoints)
      },
    },
    {
      label: () => `Editar Região`,
      onClick: ({ rowData }: any) => {
        setIsUpdateModalOpen(true)
        setDocumentId(rowData.id)
        setRegionValue(rowData.storeRegion)
      },
    },
    {
      label: () => `Deletar Região`,
      isDangerous: true,
      onClick: ({ rowData }: any) => {
        setIsDeleteModalOpen(true)
        setDocumentId(rowData.id)
      },
    },
  ]

  useEffect(() => {
    getRegion()
  }, [])

  return (
    <>
      <PageBlock variation="full">
        <div>
          <div>
            <div className="mb5">
              <h3 className="t-heading-4 mt0">
                {' '}
                Cadastre a localização de suas lojas{' '}
              </h3>
              <Table
                schema={{
                  properties: {
                    storeRegion: {
                      type: 'string',
                      title: 'Região',
                      width: 700,
                    },
                  },
                }}
                toolbar={{
                  newLine: {
                    label: 'Nova região',
                    handleCallback: () => {
                      setIsCreateModalOpen(true)
                    },
                  },
                }}
                pagination={{
                  onNextClick: () => {},
                  onPrevClick: () => {},
                  currentItemFrom: 1,
                  currentItemTo: 7,
                  onRowsChange: () => {},
                  textShowRows: 'Show rows',
                  textOf: 'of',
                  totalItems: 7,
                  rowsOptions: [7],
                }}
                items={itemsTable}
                lineActions={lineActions}
              />
            </div>
          </div>
        </div>
      </PageBlock>
        <CreateModal 
            setRegionValue={setRegionValue}
            setItemsTable={setItemsTable}
            setIsCreateModalOpen={setIsCreateModalOpen}
            regionValue={regionValue}
            itemsTable={itemsTable}
            isCreateModalOpen={isCreateModalOpen}
        />  
        <UpdateModal 
            setRegionValue={setRegionValue}
            setItemsTable={setItemsTable}
            setIsUpdateModalOpen={setIsUpdateModalOpen}
            regionValue={regionValue}
            itemsTable={itemsTable}
            isUpdateModalOpen={isUpdateModalOpen}
            documentId={documentId}
        />
        <DeleteModal 
            setItemsTable={setItemsTable}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            itemsTable={itemsTable}
            isDeleteModalOpen={isDeleteModalOpen}
            documentId={documentId}
        />
        <AddStoreModal 
            setItemsTable={setItemsTable}
            setIsAddStoreModalOpen={setIsAddStoreModalOpen}
            setSelectedStores={setSelectedStores}
            itemsTable={itemsTable}
            isAddStoreModalOpen={isAddStoreModalOpen}
            documentId={documentId}
            dropdownStores={dropdownStores}
            selectedStores={selectedStores}
            regionValue={regionValue}
        />   
    </>
  )
}

export default AdminOurStores
