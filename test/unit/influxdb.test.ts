import {expect} from 'chai'
import {InfluxDB, ClientOptions, WritePrecission} from '../../src'

describe('influxdb', () => {
  describe('constructor', () => {
    it('is created from string url', () => {
      expect(
        (new InfluxDB('http://localhost:9999?token=a') as any)._options
      ).to.deep.equal({
        url: 'http://localhost:9999?token=a',
        token: 'a',
      })
    })
    it('is created from configuration with url', () => {
      expect(
        (new InfluxDB({url: 'http://localhost:9999?token=a'}) as any)._options
      ).to.deep.equal({
        url: 'http://localhost:9999?token=a',
        token: 'a',
      })
    })
    it('is created from configuration with url and token', () => {
      expect(
        (new InfluxDB({
          url: 'https://localhost:9999?token=a',
          token: 'b',
        }) as any)._options
      ).to.deep.equal({
        url: 'https://localhost:9999?token=a',
        token: 'b',
      })
    })
    it('fails on null arg', () => {
      expect(() => new InfluxDB((null as unknown) as ClientOptions)).to.throw(
        'No url or configuration specified!'
      )
    })
    it('fails on undefined arg', () => {
      expect(
        () => new InfluxDB((undefined as unknown) as ClientOptions)
      ).to.throw('No url or configuration specified!')
    })
    it('fails on missing url', () => {
      expect(
        () => new InfluxDB(({} as ClientOptions) as ClientOptions)
      ).to.throw('No url specified!')
    })
    it('fails on missing token', () => {
      expect(
        () =>
          new InfluxDB(({
            url: 'http://localhost:9999',
          } as ClientOptions) as ClientOptions)
      ).to.throw('No token specified!')
    })
    it('fails on unsupported protocol', () => {
      expect(
        () =>
          new InfluxDB(({
            url: 'ws://localhost:9999?token=b',
          } as ClientOptions) as ClientOptions)
      ).to.throw('Unsupported')
    })
  })
  describe('apis', () => {
    const influxDb = new InfluxDB('http://localhost:9999?token=a')
    it('writeApi can be obtained without a schedule', () => {
      expect(influxDb.getWriteApi('org', 'bucket')).to.be.ok
      expect(influxDb.getWriteApi('org', 'bucket', WritePrecission.s)).to.be.ok
    })
  })
})
