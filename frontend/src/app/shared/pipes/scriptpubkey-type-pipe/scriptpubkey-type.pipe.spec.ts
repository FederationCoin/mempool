import { ScriptpubkeyTypePipe } from './scriptpubkey-type.pipe';

describe('ScriptpubkeyTypePipe', () => {
  const pipe = new ScriptpubkeyTypePipe();

  it('labels v0_p2wpkh as SW', () => {
    expect(pipe.transform('v0_p2wpkh')).toBe('SW');
  });

  it('labels v0_p2wsh as DIL until spend', () => {
    expect(pipe.transform('v0_p2wsh')).toBe('DIL');
  });

  it('passes other types through uppercased', () => {
    expect(pipe.transform('p2pkh')).toBe('P2PKH');
  });
});
