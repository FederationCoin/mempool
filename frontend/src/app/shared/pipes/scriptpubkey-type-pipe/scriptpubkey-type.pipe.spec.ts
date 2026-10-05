import { ScriptpubkeyTypePipe } from './scriptpubkey-type.pipe';

describe('ScriptpubkeyTypePipe', () => {
  const pipe = new ScriptpubkeyTypePipe();

  it('labels v0_p2wpkh as secp', () => {
    expect(pipe.transform('v0_p2wpkh')).toBe('secp');
  });

  it('labels v0_p2wsh as Dilithium', () => {
    expect(pipe.transform('v0_p2wsh')).toBe('Dilithium');
  });

  it('passes other types through uppercased', () => {
    expect(pipe.transform('p2pkh')).toBe('P2PKH');
  });
});
