import * as core from '@actions/core';
import {MinikubeConfig, getMinikubeConfig, downloadMinikube} from './minikube';

async function run() {
  try {
    let cfg: MinikubeConfig = getMinikubeConfig();
    await downloadMinikube(cfg.minikubeVersion);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
