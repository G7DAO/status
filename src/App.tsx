import '@reservoir0x/relay-kit-ui/styles.css'
import './styles/global.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { ThemeProvider, AssetsProvider, Tenant } from 'summon-ui'
import { IntlProvider } from 'summon-ui/intl'
import { Notifications } from 'summon-ui/mantine'
import { UISettingsProvider } from '@/contexts/UISettingsContext'
import en from '@/lang/en.json'
import { AuthProvider } from '@/providers/AuthProvider'
import router from '@/router'

// relay stuff
import { RelayKitProvider } from '@reservoir0x/relay-kit-ui'
import { MAINNET_RELAY_API } from '@reservoir0x/relay-sdk'
import { theme } from './utils/relayTheme'
import '@reservoir0x/relay-kit-ui/styles.css'
import { chains } from './utils/relayConfig'

dayjs.extend(utc)
dayjs.extend(timezone)

//@Todo remove when summon-ui/intl exports the type
type LangKey = 'en' | 'ja'

const NOTIFICATIONS_SPACING = '30px'
const NOTIFICATIONS_STYLES = {
  root: { top: NOTIFICATIONS_SPACING, right: NOTIFICATIONS_SPACING }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
    }
  }
})




const enMessages = { en }

//@TODO we need to set this dynamically
const TENANT_CONFIG = {
  name: 'Game7',
  lang: 'en',
  uiTheme: 'light'
}
const { name, lang, uiTheme } = TENANT_CONFIG

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <UISettingsProvider>
          <AssetsProvider tenant={name as Tenant}>
            <IntlProvider
              intlConf={{
                currentLang: lang as LangKey,
                messagesConf: {
                  ...enMessages
                }
              }}
            >
              <ThemeProvider uiTheme={uiTheme}>
                  <Notifications position='top-right' zIndex={1000} styles={NOTIFICATIONS_STYLES} />
                    <AuthProvider>
                      <RelayKitProvider
                        theme={theme}
                        options={{
                          appName: 'Relay Demo',
                          appFees: [
                            {
                              recipient: '0xE2f669A23f83Aaa69Cc8C918bF4397E4eddA4B01',
                              fee: '175' // 1.75%
                            }
                          ],
                          chains,
                          baseApiUrl: MAINNET_RELAY_API
                        }}>
                        <RouterProvider router={router} />
                      </RelayKitProvider>
                    </AuthProvider>
              </ThemeProvider>
            </IntlProvider>
          </AssetsProvider>
        </UISettingsProvider>
    </QueryClientProvider >
  )
}
