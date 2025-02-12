import { useEffect, useState } from 'react'
import styles from './LegalPage.module.css'
import { useMediaQuery } from 'summon-ui/mantine'
import Navbar from '@/components/landing/Navbar'
import axios from 'axios'

interface NodeStatus {
  name: string
  normalized_name: string
  status: string
  response: {
    current_block_number?: number
    balance?: string
    status: string
    current_block?: number
    timestamp_delays?: {
      [blockchain: string]: string
    }
  }
}

interface TimestampDelays {
  [blockchain: string]: string
}

const NODE_STATUS_URL = 'https://nodes.monitoring.game7.build/status'
const GAME7_STATUS_URL = 'https://game7.monitoring.moonstream.to/status'
const SEER_STATUS_URL = 'https://seer.monitoring.moonstream.to/status'
const MOONSTREAM_STATUS_URL = 'https://monitoring.moonstream.to/status'


const normalizeName = (name: string): string => {
  return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}

const StatusPage: React.FC = () => {
  const [navbarOpen, setNavBarOpen] = useState<boolean>(false)
  const smallView = useMediaQuery('(max-width: 750px)')
  const [nodes, setNodes] = useState<NodeStatus[]>([])
  const [game7Statuses, setGame7Statuses] = useState<NodeStatus[]>([])
  const [timestampDelays, setTimestampDelays] = useState<TimestampDelays | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [moonstreamNodes, setMoonstreamNodes] = useState<NodeStatus[]>([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nodesResponse, game7Response, seerResponse, moonstreamResponse
        ] = await Promise.all([
          axios.get<NodeStatus[]>(`${NODE_STATUS_URL}`),
          axios.get<NodeStatus[]>(`${GAME7_STATUS_URL}`),
          axios.get<NodeStatus[]>(`${SEER_STATUS_URL}`),
          axios.get<NodeStatus[]>(`${MOONSTREAM_STATUS_URL}`)
        ])

        setNodes([...nodesResponse.data].sort((a, b) => a.name.localeCompare(b.name)))

        const filteredGame7Statuses = game7Response.data.filter((item) =>
            ['faucetbalanace', 'protocolapi', 'game7', 'game7_testnet'].includes(item.name)
        )
        setGame7Statuses(filteredGame7Statuses)

        const timestampData = seerResponse.data.find((item) => item.name === 'mdb_v3_database')?.response.timestamp_delays
        if (timestampData) {
          const excludedBlockchains = [
            'Game7 Orbit Arbitrum Sepolia',
            'Imx Zkevm',
            'Imx Zkevm Sepolia',
            'Mantle Sepolia',
            'Ronin',
            'Ronin Saigon',
            'Xai',
            'Xai Sepolia'
          ];

          const normalizedDelays = Object.fromEntries(
              Object.entries(timestampData).map(([key, value]) => [
                normalizeName(key),
                value
              ]).filter(([key]) => !excludedBlockchains.includes(key))
          );
          setTimestampDelays(normalizedDelays)

          const filteredMoonstreamNodes = moonstreamResponse.data
              .filter(node => node.name.startsWith('node_'))
              .map(node => ({
                ...node,
                normalized_name: normalizeName(node.name.replace('node_', ''))
              }))
              .sort((a, b) => a.normalized_name.localeCompare(b.normalized_name))

          setMoonstreamNodes(filteredMoonstreamNodes)

        }
      } catch (error) {
        console.error('Error fetching status data:', error)
        setError('Failed to load node status')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
      <>
        <div className={styles.container}>
          <div className={styles.viewContainer}>
            <div className={`${styles.layout} ${navbarOpen && styles.layoutBlur}`}>
              <Navbar
                  navbarOpen={navbarOpen}
                  smallView={!!smallView}
                  setIsNavbarOpen={setNavBarOpen}
                  isContainer={false}
                  isSticky={false}
                  startBuilding={() => {}}
                  navigateLink={() => {}}
              />
              <div className={styles.legalHeader}>
                <div className={styles.headerContainer}>
                  <div className={styles.titleHeader}>Status</div>
                </div>
              </div>

              <div className={styles.legalMain}>
                <div className={styles.legalSection}>
                  <div className={styles.legalContent}>
                    {loading ? (
                        <p>Loading node status...</p>
                    ) : error ? (
                        <p className={styles.error}>{error}</p>
                    ) : (
                        <>
                          <ul className={styles.nodeList}>
                            {game7Statuses
                                .filter((status) => status.name === 'game7' || status.name === 'game7_testnet')
                                .map((status) => (
                                    <li key={status.name} className={styles.nodeItem}>
                              <span className={styles.nodeName}>
                                {status.name === 'game7' ? 'Game7 Mainnet' : 'Game7 Testnet'}
                              </span>
                                      <span
                                          className={
                                            status.response.status === 'ok' ? styles.nodeStatusOk : styles.nodeStatusError
                                          }
                                      >
                                        {status.response.status === 'ok' ? 'Available' : 'Unavailable'}
                                      </span>
                                      {status.response.current_block && (
                                          <span className={styles.blockNumber}>
                                            Current block: {status.response.current_block}
                                          </span>
                                      )}
                                    </li>
                                ))}
                          </ul>

                          <ul className={styles.nodeList}>
                            {nodes.map((node) => (
                                <li key={node.name} className={styles.nodeItem}>
                                  <span className={styles.nodeName}>{node.normalized_name}</span>
                                  <span
                                      className={
                                        node.response.status === 'ok' ? styles.nodeStatusOk : styles.nodeStatusError
                                      }
                                  >
                                    {node.response.status === 'ok' ? 'Available' : 'Unavailable'}
                                  </span>
                                  {node.response.current_block_number && (
                                      <span className={styles.blockNumber}>Current block: {node.response.current_block_number}</span>
                                  )}
                                </li>
                            ))}
                          </ul>

                          <div className={styles.nodeSection}>
                            <ul className={styles.nodeList}>
                              {moonstreamNodes.filter(node => ['Amoy', 'Optimism', 'Zksync Era'].includes(node.normalized_name)).map(node => (
                                  <li key={node.name} className={styles.nodeItem}>
                                    <span className={styles.nodeName}>{node.normalized_name}</span>
                                    <span
                                        className={
                                          node.response.status === 'ok' ? styles.nodeStatusOk : styles.nodeStatusError
                                        }
                                    >
                                      {node.response.status === 'ok' ? 'Available' : 'Unavailable'}
                                    </span>
                                    {node.response.current_block && (
                                        <span className={styles.blockNumber}>Current block: {node.response.current_block}</span>
                                    )}
                                  </li>
                              ))}
                            </ul>
                          </div>

                          <ul className={styles.nodeList}>
                            {game7Statuses
                                .filter((status) => status.name === 'faucetbalanace' || status.name === 'protocolapi')
                                .map((status) => (
                                    <li key={status.name} className={styles.nodeItem}>
                                      <span className={styles.nodeName}>{status.normalized_name}</span>
                                      <span
                                          className={
                                            status.response.status === 'ok' ? styles.nodeStatusOk : styles.nodeStatusError
                                          }
                                      >
                                        {status.response.status === 'ok' ? 'Available' : 'Unavailable'}
                                      </span>
                                      {status.response.balance && (
                                          <span className={styles.blockNumber}>Balance: {status.response.balance}</span>
                                      )}
                                    </li>
                                ))}
                          </ul>

                          {timestampDelays && (
                              <div className={styles.timestampSection}>
                                <h3>Blockchain Delays</h3>
                                <ul className={styles.nodeList}>
                                  {Object.entries(timestampDelays).map(([blockchain, delay]) => (
                                      <li key={blockchain} className={styles.nodeItem}>
                                        <span className={styles.nodeName}>{blockchain}</span>
                                        <span className={styles.blockNumber}>{delay}</span>
                                      </li>
                                  ))}
                                </ul>
                              </div>
                          )}
                        </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default StatusPage
