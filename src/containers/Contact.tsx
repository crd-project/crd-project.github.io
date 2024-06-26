/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react'
import Head from 'next/head'

import { useDispatch, useSelector } from 'react-redux'

import { useTranslation } from 'next-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { NextSeo } from 'next-seo'
import { asyncContactRequest, contactSetRequest } from '@Actions/contact'

// import checkedSVG from '@Public/static/checked.svg'
import warningSVG from '@Public/static/warning.svg'
import Image from 'next/image'
import { AppDispatch, RootState } from '@Src/store'
import { IContactState } from '@Interfaces/contact'

const ContactContainer = () => {
  const { t } = useTranslation(['contact'])
  const dispatch: AppDispatch = useDispatch()
  const contactState: IContactState = useSelector(
    (state: RootState) => state.contact,
  )
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleInputSubject = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(event.target.value)
  }

  const handleInputMessage = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setMessage(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!contactState.isResponse) {
      dispatch(asyncContactRequest({ name, email, subject, message }))
    }
  }

  useEffect(() => {
    if (contactState.isResponse || contactState.prevIsResponse) {
      setTimeout(() => {
        dispatch(
          contactSetRequest({
            isError: false,
            isResponse: false,
            prevIsResponse: false,
          }),
        )
      }, 3000)
    }
  }, [contactState.isResponse, contactState.prevIsResponse])

  useEffect(
    () => () => {
      dispatch(
        contactSetRequest({
          isError: false,
          isResponse: false,
          prevIsResponse: false,
        }),
      )
    },
    [],
  )

  return (
    <>
      <Head>
        <title>{t('contact:title')}</title>
      </Head>
      <NextSeo
        openGraph={{
          type: 'website',
          title: t('contact:og.title'),
          description: t('contact:og.description'),
        }}
      />
      <motion.section
        className="contact d-flex flex-column justify-content-center align-items-center"
        key="my_unique_key432"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <AnimatePresence mode="wait" initial={false}>
              {contactState.prevIsResponse ? (
                <motion.div
                  className="col-12 col-lg-6 text-center mb-30"
                  key="my_unique_key4322"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    className="cap__image mb-10"
                    src={warningSVG}
                    alt="checked"
                    priority
                  />
                  <h3 className="cap__title cap__title--medium text-lowercase">
                    {t('contact:form.warning-message.title')}
                  </h3>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    className="col-12 col-lg-6 text-center"
                    key="my_unique_key432222"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="cap__title">{t('contact:title')}</h3>
                    <h3 className="cap__text">{t('contact:subtitle')}</h3>
                  </motion.div>

                  <motion.div
                    className="col-12 col-lg-12"
                    key="my_unique_key4322223211"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="row justify-content-center">
                      <div className="col-12 col-lg-6 col-xl-6">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                          <div className="col-12 mb-auto">
                            <form
                              id="contact"
                              className="row disable"
                              onSubmit={handleSubmit}
                            >
                              <div className="col-6 mt-30">
                                <input
                                  name="name"
                                  minLength={1}
                                  onChange={handleInputName}
                                  className="form__input"
                                  placeholder={t(
                                    'contact:form.placeholders.name',
                                  )}
                                  required
                                />
                              </div>
                              <div className="col-6 mt-30">
                                <input
                                  name="email"
                                  type="email"
                                  onChange={handleInputEmail}
                                  className="form__input"
                                  placeholder={t(
                                    'contact:form.placeholders.email',
                                  )}
                                  required
                                />
                              </div>
                              <div className="col-12 mt-30">
                                <input
                                  name="subject"
                                  minLength={5}
                                  onChange={handleInputSubject}
                                  className="form__input"
                                  placeholder={t(
                                    'contact:form.placeholders.subject',
                                  )}
                                  required
                                />
                              </div>

                              <div className="col-12 mt-30">
                                <textarea
                                  name="message"
                                  className="form__input form__textarea"
                                  onChange={handleInputMessage}
                                  placeholder={t(
                                    'contact:form.placeholders.message',
                                  )}
                                  minLength={5}
                                  required
                                />
                              </div>

                              <div className="col-12 mt-30">
                                <button
                                  type="submit"
                                  className="form__btn ml-auto mr-auto"
                                  placeholder="Message"
                                >
                                  {contactState.isResponse && (
                                    <div className="form__btn-loader">
                                      <div className="dot-floating" />
                                    </div>
                                  )}
                                  <div
                                    style={{
                                      opacity: contactState.isResponse ? 0 : 1,
                                    }}
                                  >
                                    {t('contact:form.buttons.send')}
                                  </div>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>
    </>
  )
}

export default ContactContainer
