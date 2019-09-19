import {MinikubeConfig, getMinikubeConfig} from '../src/minikube';

const testEnvVars = {
  INPUT_MINIKUBE_VERSION: '1.4.0',
  INPUT_K8S_VERSION: '1.15.0',
  GITHUB_WORKSPACE: '/home/runner/repo'
};

describe('Input parsing tests', function() {
  beforeEach(() => {
    for (const key in testEnvVars)
      process.env[key] = testEnvVars[key as keyof typeof testEnvVars];
  });

  it('Correctly parses input', () => {
    let cfg: MinikubeConfig = getMinikubeConfig();
    expect(cfg.minikubeVersion).toBe(testEnvVars.INPUT_MINIKUBE_VERSION);
    expect(cfg.minikubeVersion).toBe(testEnvVars.INPUT_K8S_VERSION);
  });
});
