import { useQuery } from 'react-query'
import { useAuth } from '~/contexts/AuthenticationContext'
import { useWeb3Service } from '~/utils/withWeb3Service'

interface UseLocKManagerProps {
  lockAddress: string
  network: number
}
/**
 * Check if currently authenticated user is manager and manager could give us the manager object for that lock if we need it.
 * @param {String} lockAddress - lock address
 * @param {String} network - lock address network ID
 *
 */
export const useLockManager = ({
  lockAddress,
  network,
}: UseLocKManagerProps) => {
  const web3Service = useWeb3Service()
  const { account } = useAuth()

  const getLockManagerStatus = async () => {
    return await web3Service.isLockManager(lockAddress, account!, network!)
  }

  const { data: isManager = false } = useQuery(
    ['getLockManagerStatus', account, network, lockAddress],
    async () => getLockManagerStatus()
  )

  return {
    isManager,
  }
}