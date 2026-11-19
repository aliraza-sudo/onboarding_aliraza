import assert from 'node:assert/strict'
import test from 'node:test'
import {
  changePasswordFormSchema,
  projectFormSchema,
  registerFormSchema
} from './validation.ts'

test('registration and password-change validation survive dependency upgrades', () => {
  const registration = {
    username: 'test-user',
    password: 'strong-password',
    passwordRetype: 'strong-password'
  }
  assert.equal(registerFormSchema.safeParse(registration).success, true)
  assert.equal(
    registerFormSchema.safeParse({
      ...registration,
      passwordRetype: 'different'
    }).success,
    false
  )
  const passwordChange = {
    password: 'old-password',
    passwordNew: 'new-password',
    passwordRetype: 'new-password'
  }
  assert.equal(changePasswordFormSchema.safeParse(passwordChange).success, true)
  assert.equal(
    changePasswordFormSchema.safeParse({
      ...passwordChange,
      passwordNew: 'old-password',
      passwordRetype: 'old-password'
    }).success,
    false
  )
})

test('project form requires a name and a known status', () => {
  const project = { name: 'Roadmap', status: 'draft' }
  assert.equal(projectFormSchema.safeParse(project).success, true)
  assert.equal(projectFormSchema.safeParse({ status: 'draft' }).success, false)
  assert.equal(
    projectFormSchema.safeParse({ ...project, name: '' }).success,
    false
  )
  assert.equal(
    projectFormSchema.safeParse({ ...project, status: 'archived' }).success,
    false
  )
})
