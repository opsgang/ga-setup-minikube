import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as exec from '@actions/exec';
import * as io from '@actions/io';
import * as path from 'path';
import * as os from 'os';

// Config key values in the action.yml.
const MinikubeVersionInput: string = 'minikube-version';
const K8sVersionInput: string = 'k8s-version';

export class MinikubeConfig {
  minikubeVersion: string;
  k8sVersion: string;

  constructor(minikubeVersion: string, k8sVersion: string) {
    this.minikubeVersion = minikubeVersion;
    this.k8sVersion = k8sVersion;
  }

  // Returns the arguments to pass to `minikube start`.
  getCommand(): string[] {
    let args: string[] = ['start'];

    return args;
  }
}

export function getMinikubeConfig(): MinikubeConfig {
  const minikubeVersion: string = core.getInput(MinikubeVersionInput);
  const k8sVersion: string = core.getInput(K8sVersionInput);
  return new MinikubeConfig(minikubeVersion, k8sVersion);
}

export function getDownloadUrl(version: string): string {
  const osPlat: string = os.platform();

  const platform: string = osPlat === 'win32' ? 'windows' : osPlat;
  const suffix: string = osPlat === 'win32' ? '.exe' : '';

  return `https://github.com/kubernetes/minikube/releases/download/v${version}/minikube-${platform}-amd64${suffix}`;
}

// this action should always be run from a Linux worker
export async function downloadMinikube(version: string) {
  let url: string = getDownloadUrl(version);

  console.info('Downloading Minikube from ' + url);

  let downloadPath: string | null = null;
  downloadPath = await tc.downloadTool(url);
  const binPath: string = '/home/runner/bin';
  await io.mkdirP(binPath);
  await exec.exec('chmod', ['+x', downloadPath]);
  await io.mv(downloadPath, path.join(binPath, 'kind'));

  core.addPath(binPath);
}
