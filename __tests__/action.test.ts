import {MinikubeConfig, getMinikubeConfig} from '../src/minikube';

const testEnvVars = {
  'INPUT_MINIKUBE-VERSION': '1.4.0',
  'INPUT_K8S-VERSION': '1.15.0',
  GITHUB_WORKSPACE: '/home/runner/repo'
};

describe('Input parsing tests', function() {
  beforeEach(() => {
    for (const key in testEnvVars) {
      process.env[key] = testEnvVars[key as keyof typeof testEnvVars];
    }
  });

  it('Correctly parses input', () => {
    let cfg: MinikubeConfig = getMinikubeConfig();

    expect(cfg.minikubeVersion).toBe(testEnvVars['INPUT_MINIKUBE-VERSION']);
    expect(cfg.k8sVersion).toBe(testEnvVars['INPUT_K8S-VERSION']);
  });
});
