import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Transactions Management',
  },
  {
    name: 'Transactions',
    url: '/transactions-management',
    iconComponent: { name: 'cil-credit-card' }
  },

];
