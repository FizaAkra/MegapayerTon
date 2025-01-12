import { walletVersionText } from '@tonkeeper/core/dist/entries/wallet';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../hooks/appContext';
import { useTranslation } from '../../hooks/translation';
import { SettingsRoute, relative, WalletSettingsRoute } from '../../libs/routes';
import { useJettonList } from '../../state/jetton';
import { DeleteAccountNotification } from './DeleteAccountNotification';
import {
    AppsIcon,
    ListOfTokensIcon,
    LogOutIcon,
    RecoveryPhraseIcon,
    SaleBadgeIcon,
    SecurityIcon,
    SettingsProIcon,
    WalletsIcon
} from './SettingsIcons';
import { SettingsItem, SettingsList } from './SettingsList';
import { useActiveWallet, useAccountsState, useActiveAccount } from '../../state/wallet';
import { useWalletNftList } from '../../state/nft';

const SingleAccountSettings = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const account = useActiveAccount();
    const wallet = account.activeTonWallet;
    const { data: jettons } = useJettonList();
    const { data: nft } = useWalletNftList();
    const { proFeatures } = useAppContext();
    const mainItems = useMemo<SettingsItem[]>(() => {
        const items: SettingsItem[] = [];

        if (account.type === 'mnemonic') {
            items.push({
                name: t('settings_recovery_phrase'),
                icon: <RecoveryPhraseIcon />,
                action: () => navigate(relative(SettingsRoute.recovery))
            });
        }

        if (account.type === 'mnemonic' || account.type === 'ton-only') {
            items.push({
                name: t('settings_wallet_version'),
                icon: walletVersionText(wallet.version),
                action: () => navigate(relative(SettingsRoute.version))
            });
        }

        // check available derivations length to filter and keep only non-legacy added ledger accounts
        if (account.type === 'ledger' && account.allAvailableDerivations.length > 1) {
            items.push({
                name: t('settings_ledger_indexes'),
                icon: `# ${account.activeDerivationIndex + 1}`,
                action: () => navigate(relative(SettingsRoute.ledgerIndexes))
            });
        }

        if (proFeatures) {
            items.unshift({
                name: t('tonkeeper_pro'),
                icon: <SettingsProIcon />,
                action: () => navigate(relative(SettingsRoute.pro))
            });
        }

        if (jettons?.balances.length) {
            items.push({
                name: t('settings_jettons_list'),
                icon: <ListOfTokensIcon />,
                action: () => navigate(relative(SettingsRoute.jettons))
            });
        }

        if (nft?.length) {
            items.push({
                name: t('settings_collectibles_list'),
                icon: <SaleBadgeIcon />,
                action: () => navigate(relative(SettingsRoute.nft))
            });
        }

        items.push({
            name: t('settings_security'),
            icon: <SecurityIcon />,
            action: () => navigate(relative(SettingsRoute.security))
        });
        items.push({
            name: t('settings_connected_apps'),
            icon: <AppsIcon />,
            action: () => navigate(relative(WalletSettingsRoute.connectedApps))
        });

        return items;
    }, [t, navigate, account, jettons, nft]);

    return (
        <>
            <SettingsList items={mainItems} />
        </>
    );
};

const MultipleAccountSettings = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const wallet = useActiveWallet();

    const { data: jettons } = useJettonList();
    const { data: nft } = useWalletNftList();
    const { proFeatures } = useAppContext();
    const account = useActiveAccount();

    const [deleteAccount, setDeleteAccount] = useState(false);

    const accountItems = useMemo(() => {
        const items: SettingsItem[] = [
            {
                name: t('Manage_wallets'),
                icon: <WalletsIcon />,
                action: () => navigate(relative(SettingsRoute.account))
            }
            // {
            //   name: t('Subscriptions'),
            //   icon: <SubscriptionIcon />,
            //   action: () => navigate(relative(SettingsRoute.subscriptions)),
            // },
        ];

        if (proFeatures) {
            items.push({
                name: t('tonkeeper_pro'),
                icon: <SettingsProIcon />,
                action: () => navigate(relative(SettingsRoute.pro))
            });
        }

        return items;
    }, [wallet, t]);

    const mainItems = useMemo<SettingsItem[]>(() => {
        const items: SettingsItem[] = [];

        if (account.type === 'mnemonic') {
            items.push({
                name: t('settings_recovery_phrase'),
                icon: <RecoveryPhraseIcon />,
                action: () => navigate(relative(SettingsRoute.recovery))
            });
        }

        if (account.type === 'mnemonic' || account.type === 'ton-only') {
            items.push({
                name: t('settings_wallet_version'),
                icon: walletVersionText(wallet.version),
                action: () => navigate(relative(SettingsRoute.version))
            });
        }

        // check available derivations length to filter and keep only non-legacy added ledger accounts
        if (account.type === 'ledger' && account.allAvailableDerivations.length > 1) {
            items.push({
                name: t('settings_ledger_indexes'),
                icon: `# ${account.activeDerivationIndex + 1}`,
                action: () => navigate(relative(SettingsRoute.ledgerIndexes))
            });
        }

        if (jettons?.balances.length) {
            items.push({
                name: t('settings_jettons_list'),
                icon: <ListOfTokensIcon />,
                action: () => navigate(relative(SettingsRoute.jettons))
            });
        }

        if (nft?.length) {
            items.push({
                name: t('settings_collectibles_list'),
                icon: <SaleBadgeIcon />,
                action: () => navigate(relative(SettingsRoute.nft))
            });
        }

        items.push({
            name: t('settings_security'),
            icon: <SecurityIcon />,
            action: () => navigate(relative(SettingsRoute.security))
        });
        items.push({
            name: t('settings_connected_apps'),
            icon: <AppsIcon />,
            action: () => navigate(relative(WalletSettingsRoute.connectedApps))
        });
        items.push({
            name: t('Delete_wallet_data'),
            icon: <LogOutIcon />,
            action: () => setDeleteAccount(true)
        });
        return items;
    }, [t, navigate, wallet, jettons, nft]);

    return (
        <>
            <SettingsList items={accountItems} />
            <SettingsList items={mainItems} />
            <DeleteAccountNotification
                account={deleteAccount ? account : undefined}
                handleClose={() => setDeleteAccount(false)}
            />
        </>
    );
};

export const AccountSettings = () => {
    const accounts = useAccountsState();

    if (accounts.length > 1) {
        return <MultipleAccountSettings />;
    } else {
        return <SingleAccountSettings />;
    }
};
