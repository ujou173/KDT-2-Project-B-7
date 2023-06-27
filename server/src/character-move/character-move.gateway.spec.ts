import { Test, TestingModule } from '@nestjs/testing';
import { CharacterMoveGateway } from './character-move.gateway';

describe('CharacterMoveGateway', () => {
  let gateway: CharacterMoveGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacterMoveGateway],
    }).compile();

    gateway = module.get<CharacterMoveGateway>(CharacterMoveGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
