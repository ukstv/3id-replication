import { CeramicClient } from "@ceramicnetwork/http-client";
import {ThreeIdProvider} from "@3id/did-provider";
import * as uint8arrays from 'uint8arrays'
import * as crypto from 'node:crypto'
import { getResolver as get3IDResolver } from "@ceramicnetwork/3id-did-resolver";
import { DID } from "dids";


async function main() {
    const seed = uint8arrays.fromString('627b6d2bd10220b4e42d5df316ed69d04638386d044f41c3d620e1be6378410b', 'hex')
    const ceramic = new CeramicClient()

    const threeID = await ThreeIdProvider.create({
        ceramic: ceramic,
        // seed: seed,
        authSecret: seed,
        authId: 'hello2',
        getPermission: (request) => Promise.resolve(request.payload.paths),
    });
    const resolver = get3IDResolver(ceramic);

    const did = new DID({
        provider: threeID.getDidProvider(),
        resolver: resolver,
    });

    await did.authenticate()
    console.log('did', did.id)
}

main()