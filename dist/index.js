import { Lightclient, LightclientEvent } from "@lodestar/light-client";
import { fromHexString } from "@chainsafe/ssz";
import { chainConfig } from "./config.js"; // for some reason this needs to be .js
import { createIChainForkConfig } from "@lodestar/config";
async function main() {
    const genesisData = {
        genesisTime: 1606824023,
        genesisValidatorsRoot: "0x4b363db94e286120d76eb905340fdd4e54bfe9f06bf33ff6cf5ad27f511bfe95"
    };
    const beaconApiUrl = "https://lodestar-mainnet.chainsafe.io";
    const config = createIChainForkConfig(chainConfig);
    const client = await Lightclient.initializeFromCheckpointRoot({
        config,
        logger: undefined,
        beaconApiUrl,
        genesisData,
        checkpointRoot: fromHexString("428192ee7dc9d5724851ce07d76190c162eff6b747d2dfab991bf7db54b9994f")
    });
    client.start();
    client.emitter.on(LightclientEvent.head, (head) => {
        console.log("New Header:", head);
    });
    // const client2 = await getClient({ baseUrl: beaconApiUrl }, { config: configDefault });
}
main();
// getDomain(stateSlot: Slot, domainType: DomainType, messageSlot ?: Slot): Uint8Array {
//     // ```py
//     // def get_domain(state: BeaconState, domain_type: DomainType, epoch: Epoch=None) -> Domain:
//     //   """
//     //   Return the signature domain (fork version concatenated with domain type) of a message.
//     //   """
//     //   epoch = get_current_epoch(state) if epoch is None else epoch
//     //   fork_version = state.fork.previous_version if epoch < state.fork.epoch else state.fork.current_version
//     //   return compute_domain(domain_type, fork_version, state.genesis_validators_root)
//     // ```
//     const epoch = Math.floor((messageSlot ?? stateSlot) / SLOTS_PER_EPOCH);
//     // Get pre-computed fork schedule, which _should_ match the one in the state
//     const stateForkInfo = chainForkConfig.getForkInfo(stateSlot);
//     // Only allow to select either current or previous fork respective of the fork schedule at stateSlot
//     const forkName = epoch < stateForkInfo.epoch ? stateForkInfo.prevForkName : stateForkInfo.name;
//     const forkInfo = chainForkConfig.forks[forkName];
//     let domainByType = domainCache.get(forkInfo.name);
//     if (!domainByType) {
//         domainByType = new Map<DomainType, Uint8Array>();
//         domainCache.set(forkInfo.name, domainByType);
//     }
//     let domain = domainByType.get(domainType);
//     if (!domain) {
//         domain = computeDomain(domainType, forkInfo.version, genesisValidatorsRoot);
//         domainByType.set(domainType, domain);
//     }
//     return domain;
// },
//# sourceMappingURL=index.js.map