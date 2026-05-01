#!/bin/bash

REGISTRY="https://npmjs-registry.ivyteam.ch/"

pnpm unpublish "@axonivy/role-editor@${1}" --registry $REGISTRY
pnpm unpublish "@axonivy/role-editor-protocol@${1}" --registry $REGISTRY