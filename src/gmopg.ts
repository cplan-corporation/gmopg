import axios, {AxiosInstance} from 'axios'

import * as merge from 'deepmerge'
import * as enums from './client.enum'
import Memberable from './client/memberable'
import Cardable from './client/cardable'
import Tranable  from './client/tranable'
import Config, {TConfig, defaults} from './config'
import {applyMixins, generateID} from './util'

export default class GMOPG implements Memberable, Cardable, Tranable {
  public config: TConfig
  public client: AxiosInstance
  public options: object

  constructor(config: TConfig) {
    this.config = merge(defaults, config)
    const configByEnv: TConfig = Config.buildByEnv()
    if (configByEnv !== {}) {
      this.config = merge(this.config, configByEnv)
    }
    this.client = axios.create(this.config.axios)
  }

  saveMember: (args: any) => any
  updateMember: (args: any) => any
  deleteMember: (args: any) => any
  searchMember: (args: any) => any
  defaultMemberData: () => any

  saveCard: (args: any) => any
  deleteCard: (args: any) => any
  searchCard: (args: any) => any
  defaultCardData: () => any

  entryTran: (args: any) => any
  execTran: (args: any) => any
  alterTran: (args: any) => any
  deleteTran: (args: any) => any
  searchTrade: (args: any) => any
  changeTran: (args: any) => any

  get enums() {
    return enums
  }

  public create(config: TConfig): GMOPG {
    return GMOPG.createInstance(config)
  }

  static createInstance(config: TConfig): GMOPG {
    return new GMOPG(config)
  }

  public generateMemberID(key: string): string {
    return GMOPG.generateMemberID(key)
  }

  static generateMemberID(key: string): string {
    return generateID(key)
  }
}

applyMixins(GMOPG, [Memberable, Cardable, Tranable])
