#!/bin/bash

REGISTRY="https://npmjs-registry.ivyteam.ch/"

npm unpublish "@axonivy/role-editor@${1}" --registry $REGISTRY
npm unpublish "@axonivy/role-editor-protocol@${1}" --registry $REGISTRY