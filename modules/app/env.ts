export type NetConfigParams = {
  project: string,
  protocol: string,
  domain: string,
  prodDomain: string,
  minifiedAssets: boolean
}

export class NetConfig {

  project: string
  isProd: boolean
  minifiedAssets: boolean
  domain!: string
  assetDomain!: string
  assetBaseUrl!: string
  protocol: string
  socketDomains: string[]
  
  constructor({
    project,
    protocol,
    domain,
    prodDomain,
    minifiedAssets
  }: NetConfigParams, mode: string) {

    this.project = project;
    
    this.isProd = mode==='production';
    this.minifiedAssets = minifiedAssets;

    this.domain = this.isProd?prodDomain:domain;
    //this.protocol = this.isProd ? 'https://':'http://';
    this.protocol = protocol;

    this.assetDomain = this.domain;
    this.assetBaseUrl = this.protocol + this.domain;

    this.socketDomains = [this.domain];
  }
}

export class Env {

  constructor(readonly net: NetConfig) {}

}
