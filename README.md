# ga-setup-minikube

Sets up [Minikube](https://minikube.sigs.k8s.io) for your Github Actions.

## Motivation

The [KinD (Kubernetes in Docker)](https://kind.sigs.k8s.io/) is amazing, and has a [Github Action](https://github.com/engineerd/setup-kind),
but if you want to test deeper level integrations, e.g. you are writing a CNI or
Service Operator, you might need Minikube.

Minikube is a mature project (at Kubernetes timescale), comes with multiple VM driver, supports
Persistent Volumes, GPUs, etc.

Also, many online Kubernetes tutorial guides you through Minikube, so this action can be
handy if you want to write tests against your homework.

This action assumes a Linux environment, but might work with MacOS and Windows Minikube.
Anyway, it is not tested atm. PRs are welcome!

Because Minicube is flexible, there is no need to pass a lot of variable in one command line,
but it is possible to set your config gradually with `minikube config set` and at the end
start Minikube with `minikube start`. Therefore this action just does the basics to download
and set the minimum requirement for Minikube. The rest is up to you.

## Example usage

```
name: "Create cluster using Minkube"
on: [pull_request, push]

jobs:
  kind:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - uses: opsgang/ga-setup-minikube@v0.1.0
      with:
        minikube-version: 1.4.0
        k8s-version: 1.15.1
    - name: Testing
      run: |
        minikube config set vm-driver kvm2
        minikube config set kubernetes-version=v1.15.1
        minikube start
        minikube update-context
        kubectl cluster-info
        kubectl get pods -n kube-system
```

> Note: GitHub Actions workers come pre-configured with `kubectl` version 1.15.1.

## Optional inputs

* `minikube-version`: Version of the Minikube. The default is `1.4.0` .
* `k8s-version`: The Kubernetes version to use. The default is `1.15.1`. 
