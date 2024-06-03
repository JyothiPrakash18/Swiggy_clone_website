import React from 'react'

const TopHeroSection = () => {
  return (
    <section className="media_showcase">
            <div className="mi_container">
                <div className="media_showcase_container">
                    <div className="media_showcase_grid">
                        <article className="media_showcase_image"></article>
                        <article className="media_showcase_content">
                            <div className="heading_wrapper">
                                <h1 className="mi_title leader_showcase_title max_width">
                                    Meat, Eat & Enjoy
                                </h1>
                                <h1 className="mi_title leader_showcase_title_invert max_width">
                                    The True Taste
                                </h1>
                            </div>

                            <p className="mi_note leader_showcase_note max_width">
                                Here you will find resources and tools that will help you guide, grow and
                                protect your business.
                            </p>
                        </article>
                    </div>
                    <div className="showcase_counters">
                        <div className="counter_card_list">
                            <div className="counter_card">
                                <div className="counter_flex">
                                    <div className="counter_number">
                                        <h1 className="mi_title leader_showcase_title num" data-val="24">
                                            24
                                        </h1>
                                    </div>
                                    <div className="counter_details">
                                        <p className="mi_body media_showcase_note">Total</p>
                                        <p className="mi_body media_showcase_note">
                                            Press Release
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="counter_card">
                                <div className="counter_flex">
                                    <div className="counter_number">
                                        <h1 className="mi_title leader_showcase_title num" data-val="16">
                                            16
                                        </h1>
                                    </div>
                                    <div className="counter_details">
                                        <p className="mi_body media_showcase_note">Total</p>
                                        <p className="mi_body media_showcase_note">
                                            New Release
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="counter_card">
                                <div className="counter_flex">
                                    <div className="counter_number">
                                        <h1 className="mi_title leader_showcase_title num" data-val="12">
                                            12
                                        </h1>
                                    </div>
                                    <div className="counter_details">
                                        <p className="mi_body media_showcase_note">Total</p>
                                        <p className="mi_body media_showcase_note">Article</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default TopHeroSection