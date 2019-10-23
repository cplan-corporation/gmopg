import test from 'ava'
import {BadRequest} from './errors'


test('new returns Error instance', (t) => {
  t.true(new BadRequest() instanceof BadRequest)
})

test('variables is message as instance', (t) => {
  const err = new BadRequest('yo')
  t.is(err.message, 'yo')
})

test('.parseError returns ErrInfo as array', (t) => {
  const err = new BadRequest().parseError({ErrInfo: 'NC1000009|N0C030G96'})
  t.is(err.errors[0].en, 'Input parameter error / billing information presence judgment flag incorrect format')
  t.is(err.errors[1].en, '[Settlement request] Cancel processing has failed at the subsequent settlement center.')
  t.is(err.errInfo[0], 'NC1000009')
  t.is(err.errInfo[1], 'N0C030G96')
})

test('.parseError returns unique ErrInfos', (t) => {
  const err = new BadRequest().parseError({ErrInfo: 'E61030001|E61030001'})
  t.deepEqual(err.errors, [{ja: 'ご契約内容エラー/現在のご契約では、ご利用になれません。', en: 'Your request cannot be accepted under the current merchant contract.'}])
  t.deepEqual(err.errInfo, ['E61030001'])
})
